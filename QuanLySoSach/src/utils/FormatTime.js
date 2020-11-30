function formatNewDateToDate(date, type) {
    let d = new Date(date)
    let day = ('0' + d.getDate()).substr(-2)
    let month = ('0' + (d.getMonth() + 1)).substr(-2)
    let year = d.getFullYear()
    if (type === 1) {
        return day + '/' + month + '/' + year
    } else {
        return day + '/' + month + '/' + year
    }
}


function formatNewDateToTime(date, type) {
    let d = new Date(date)
    let hour = ('0' + d.getHours()).substr(-2)
    let minute = ('0' + d.getMinutes()).substr(-2)
    // let year = d.getFullYear()
    if (type === 1) {
        return hour + ':' + minute
    } else {
        return hour + ':' + minute
    }
}

export { formatNewDateToDate, formatNewDateToTime }