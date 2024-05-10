function datetimeFormat(datetime) {
    const year = datetime.getFullYear();
    const month = String(datetime.getMonth() + 1).padStart(2, '0'); // Mês começa de 0 (janeiro é 0)
    const day = String(datetime.getDate()).padStart(2, '0');
    const hour = String(datetime.getHours() - 3).padStart(2, '0');
    const minute = String(datetime.getMinutes()).padStart(2, '0');
    const second = String(datetime.getSeconds()).padStart(2, '0');

    const formatedDatetime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formatedDatetime
}

module.exports = datetimeFormat;