const { fetch } = require('undici')

main()

async function main() {
    const resp = await fetch('https://api-ticketfront.interpark.com/v1/goods/23001998/playSeq/PlaySeq/001/REMAINSEAT')
    if (!resp.ok) {
        console.log(`HTTP error! status: ${resp.status}`)
        return
    }
    const data = await resp.json()
    const seat = data.data.remainSeat.find(seat => seat.remainCnt > 0)
    if (!seat) {
        console.log('텔즈위버 표가 없습니다.')
        return
    }
    await fetch(process.env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify({
            username: '텔즈위버남은표',
            icon_emoji: ':ticket:',
            text: `텔즈위버 남은 표가 있습니다! (${seat.seatGradeName}: ${seat.remainCnt}개) \n https://ticket.interpark.com/Ticket/Goods/GoodsInfo.asp?GoodsCode=23001998`,
        }),
    })
}
