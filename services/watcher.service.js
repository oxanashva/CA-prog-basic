import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const KEY = "WATCHERS_DB"

export const watcherService = {
    loadWatchers,
    addWatcher,
    removeWatcher
}
function _getColors() {
    return [
        "#2D9F8F",
        "#00c9ac",
        "#ef82f4",
        "#982fa0",
        "#9382da",
        "#7b4b7d",
        "#8a6e8a",
        "#00a6b4",
        "#4992de",
        "#6391cc",
        "#ffa17a",
        "#76b795",
        "#bbf299",
        "#86d898",
        "#0177bd",
        "#f9f871",
        "#c5eb77",
        "#6cc889"
    ]
}

function _getFullName() {
    return [
        "Olivia James",
        "Liam Wilson",
        "Charlotte Miller",
        "Noah Brown",
        "Amelia Davis",
        "Oliver Garcia",
        "Sophia Rodriguez",
        "Elijah Martinez",
        "Isabella Hernandez",
        "Lucas Moore",
        "Ava Lee",
        "William Clark",
        "Evelyn Scott",
        "Benjamin Adams",
        "Luna Baker",
        "Sebastian Hall",
        "Grace King",
        "Henry Wright"
    ]
}

function _getMovies() {
    return [
        "Lilo & Stitch",
        "Minecraft",
        "Superman",
        "Jurassic World",
        "Train Your Dragon",
        "Mission: Impossible",
        "The Fantastic Four",
        "Captain America",
        "Thunderbolts",
        "Snow White",
        "28 Years Later",
        "The Monkey",
        "Mickey 17",
        "Ballerina",
        "The Bad Guys 2",
        "Dog Man",
        "F1",
        "A Real Pain"
    ]
}

function _getParameterArr(arr, length) {
    const randomItems = []
    const tempArr = [...arr]
    for (let i = 0; i < length; i++) {
        if (tempArr.length === 0) {
            break;
        }
        const randomIndex = utilService.getRandomIntInclusive(0, tempArr.length - 1)
        const randomItem = {
            id: utilService.makeId(),
            name: tempArr[randomIndex]
        }
        randomItems.push(randomItem)
        tempArr.splice(randomIndex, 1)
    }
    return randomItems
}

function _createWatcher(fullName, color) {
    return {
        id: utilService.makeId(),
        fullName: fullName,
        movies: _getParameterArr(_getMovies(), 3),
        color: color
    }
}

function _createWatchers(key, num) {
    const watchers = []
    const uniqueNames = [..._getFullName()]
    const uniqueColors = [..._getColors()]

    for (let i = 0; i < num; i++) {
        if (uniqueNames.length === 0 || uniqueColors.length === 0) {
            break
        }

        const nameIndex = utilService.getRandomIntInclusive(0, uniqueNames.length - 1)
        const colorIndex = utilService.getRandomIntInclusive(0, uniqueColors.length - 1)

        const watcherName = uniqueNames[nameIndex]
        const watcherColor = uniqueColors[colorIndex]

        watchers.push(_createWatcher(watcherName, watcherColor))

        uniqueNames.splice(nameIndex, 1)
        uniqueColors.splice(colorIndex, 1)
    }
    utilService.saveToStorage(key, watchers)
    return watchers
}

function loadWatchers() {
    return storageService.query(KEY)
        .then(watchers => {
            if (watchers.length === 0) {
                const sampleData = _createWatchers(KEY, 3)
                return sampleData
            }
            else {
                return watchers
            }
        })
}

function addWatcher(watcher) {
    return storageService.post(KEY, watcher)
}

function removeWatcher(id) {
    return storageService.remove(KEY, id)
}