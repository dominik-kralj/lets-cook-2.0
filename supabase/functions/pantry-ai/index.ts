/* eslint-disable max-lines-per-function */
import { createClient } from "jsr:@supabase/supabase-js@2"

const corsHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers":
		"authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
	if (req.method === "OPTIONS") {
		return new Response("ok", { headers: corsHeaders })
	}

	try {
		const authHeader = req.headers.get("Authorization")
		if (!authHeader) {
			return new Response(
				JSON.stringify({ error: "No authorization header" }),
				{
					status: 401,
					headers: {
						...corsHeaders,
						"Content-Type": "application/json",
					},
				},
			)
		}

		const supabase = createClient(
			Deno.env.get("SUPABASE_URL") ?? "",
			Deno.env.get("SUPABASE_ANON_KEY") ?? "",
			{ global: { headers: { Authorization: authHeader } } },
		)

		const body = await req.json()
		const { messages } = body

		const tools = [
			{
				type: "function",
				function: {
					name: "get_pantry_items",
					description:
						"Get all items in the user's pantry with quantities and units.",
					parameters: {
						type: "object",
						properties: {
							filter: {
								type: "string",
								description:
									"Optional filter to search for specific ingredients",
							},
						},
						required: [],
					},
				},
			},
		]

		const executeTool = async (
			name: string,
			input: Record<string, string>,
		) => {
			if (name === "get_pantry_items") {
				let query = supabase
					.from("pantry_items")
					.select("name, quantity, unit")
				if (input.filter) {
					query = query.ilike("name", `%${input.filter}%`)
				}
				const { data, error } = await query
				if (error) throw error
				return JSON.stringify(data)
			}
			return JSON.stringify({ error: "Unknown tool" })
		}

		const openaiMessages = [
			{
				role: "system",
				content: `You are a helpful cooking assistant. You have access to the user's pantry through tools.
When asked what to cook, use get_pantry_items to check what's available first, then suggest 3-4 specific recipes they can make.
Be friendly, concise and practical. If they want a full recipe, provide it with ingredients and steps.`,
			},
			...messages,
		]

		while (true) {
			const response = await fetch(
				"https://api.openai.com/v1/chat/completions",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${Deno.env.get("OPENAI_API_KEY")}`,
					},
					body: JSON.stringify({
						model: "gpt-4o-mini",
						max_tokens: 1024,
						messages: openaiMessages,
						tools,
						tool_choice: "auto",
					}),
				},
			)

			const data = await response.json()
			const choice = data.choices[0]

			if (choice.finish_reason === "tool_calls") {
				openaiMessages.push(choice.message)

				const toolResults = []

				for (const toolCall of choice.message.tool_calls) {
					const input = JSON.parse(toolCall.function.arguments)
					const result = await executeTool(
						toolCall.function.name,
						input,
					)
					toolResults.push({
						role: "tool",
						tool_call_id: toolCall.id,
						content: result,
					})
				}

				openaiMessages.push(...toolResults)
			} else {
				const text = choice.message.content

				return new Response(JSON.stringify({ message: text }), {
					headers: {
						...corsHeaders,
						"Content-Type": "application/json",
					},
				})
			}
		}
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { ...corsHeaders, "Content-Type": "application/json" },
		})
	}
})
