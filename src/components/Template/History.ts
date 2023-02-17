const getHistory = (name: string) => {
    const contHistory = JSON.parse(localStorage.getItem(`${name}-cont-history`) || '{}')
    return contHistory;
}

const getHistoryByTab = (tab: number, name: string) => {
    return getHistory(name)[`tab${tab + 1}`]
}

const getLastHistoryByTab = (tab: number, name: string) => {
    const historyArr = getHistoryByTab(tab, name);
    return historyArr[historyArr.length - 1];
}

const isHistoryEmpty = (tab: number, name: string) => {
    if(!getHistoryByTab(tab, name)) {
        return true;
    }

    return getHistoryByTab(tab, name).length === 0;
}

const setHistoryStorage = (tab: number, name:string, historyArr: any[]) => {
    const tabName = `tab${tab + 1}`;
    let contHistory = getHistory(name);

    contHistory[tabName] = historyArr;
    localStorage.setItem(`${name}-cont-history`, JSON.stringify(contHistory))
}

export { getHistory, getHistoryByTab, getLastHistoryByTab, isHistoryEmpty, setHistoryStorage }
