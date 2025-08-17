interface AuthorInfoProps {
  avatar: string
  nickname: string
  uniqueId: string
}

export function AuthorInfo({ avatar, nickname, uniqueId }: AuthorInfoProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <img
        src={avatar || "/placeholder.svg"}
        alt={nickname}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <p className="font-medium">{nickname}</p>
        <p className="text-sm text-muted-foreground">@{uniqueId}</p>
      </div>
    </div>
  )
}
