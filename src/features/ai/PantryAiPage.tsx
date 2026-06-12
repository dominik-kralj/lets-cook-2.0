import { useState, useRef, useEffect } from "react"
import { Button } from "@/shared/components/ui/button"
import { Textarea } from "@/shared/components/ui/textarea"
import { SendHorizonal, Bot, Sparkles } from "lucide-react"
import { supabase } from "@/services/supabase"

type Message = {
	id: string
	role: "user" | "assistant"
	content: string
	isToolCall?: boolean
}

const SUGGESTIONS = [
	"What can I cook tonight?",
	"Quick 30-minute meal ideas",
	"Something with chicken and pasta",
	"Create a full recipe for me",
]

function PantryAiPage() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "welcome",
			role: "assistant",
			content:
				"Hey! I can see your pantry. Ask me what to cook tonight and I'll suggest recipes based on what you actually have. You can also ask me to create a full recipe with ingredients and steps.",
		},
	])
	const [input, setInput] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault()
			handleSend()
		}
	}

	const handleSend = async () => {
		if (!input.trim() || isLoading) return
		const text = input.trim()
		setInput("")

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: "user",
			content: text,
		}

		const updatedMessages = [...messages, userMessage]
		setMessages(updatedMessages)
		setIsLoading(true)

		try {
			const { data, error } = await supabase.functions.invoke(
				"pantry-ai",
				{
					body: {
						messages: updatedMessages
							.filter((m) => !m.isToolCall)
							.map((m) => ({
								role: m.role,
								content: m.content,
							})),
					},
				},
			)

			if (error) throw error

			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: data.message,
				},
			])

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (_err) {
			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: "Something went wrong. Please try again.",
				},
			])
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="flex h-full flex-col overflow-hidden">
			<div className="mb-4 flex shrink-0 items-center gap-2 border-b pt-2 pb-4">
				<Sparkles className="size-5 text-primary" />
				<div>
					<h1 className="text-xl font-bold">Pantry AI</h1>
					<p className="text-xs text-muted-foreground">
						Ask me what to cook based on your pantry
					</p>
				</div>
			</div>

			<div className="min-h-0 flex-1 space-y-4 overflow-y-auto pb-4">
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
					>
						{message.role === "assistant" && (
							<div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
								<Bot className="size-4 text-primary" />
							</div>
						)}
						<div
							className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
								message.role === "user"
									? "rounded-br-sm bg-primary text-primary-foreground"
									: "rounded-bl-sm border border-border bg-card"
							}`}
						>
							{message.content}
						</div>
					</div>
				))}

				{isLoading && (
					<div className="flex gap-3">
						<div className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
							<Bot className="size-4 text-primary" />
						</div>
						<div className="rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3">
							<div className="flex items-center gap-1.5">
								<span
									className="size-1.5 animate-bounce rounded-full bg-primary"
									style={{ animationDelay: "0ms" }}
								/>
								<span
									className="size-1.5 animate-bounce rounded-full bg-primary"
									style={{ animationDelay: "150ms" }}
								/>
								<span
									className="size-1.5 animate-bounce rounded-full bg-primary"
									style={{ animationDelay: "300ms" }}
								/>
							</div>
						</div>
					</div>
				)}

				<div ref={messagesEndRef} />
			</div>

			{messages.length === 1 && (
				<div className="flex flex-wrap gap-2 pb-3">
					{SUGGESTIONS.map((suggestion) => (
						<button
							key={suggestion}
							onClick={() => {
								setInput(suggestion)
							}}
							className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
						>
							{suggestion}
						</button>
					))}
				</div>
			)}

			<div className="flex items-end gap-2 border-t pt-4 pb-2">
				<Textarea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Ask what to cook..."
					className="max-h-[120px] min-h-[42px] resize-none"
					rows={1}
				/>
				<Button
					size="icon"
					onClick={handleSend}
					disabled={!input.trim() || isLoading}
					className="shrink-0"
				>
					<SendHorizonal className="size-4" />
				</Button>
			</div>
		</div>
	)
}

export default PantryAiPage
