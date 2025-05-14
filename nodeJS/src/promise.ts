const myPromise = new Promise((resolve, reject) => {
    let success = false 

    if (success) {
        resolve('Success')
    } else {
        reject('Error')
    }        
})

const myPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => {        
        resolve('Hello World')
})
})