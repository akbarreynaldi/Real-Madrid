//path handler
const pathHandler = (path) => {
    let res = {};
    const main = path.split('?');
    Object.assign(res, {
        "target": main[0]
    });
    return res;
}

export default pathHandler;