export function formatMessageTime(date){
    return new Date(date).toLocaleTimeString("en-us",{
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        hour12: false,
    })
}