const url = 'https://nigerian-states-info.herokuapp.com/api/v1/states'

const states =
    fetch(url)
        .then(response => response.json())
        .then(data => {
            data.data.map(element => `${element.Name} ${console.log(element.Name)}`);
        })

console.log(states)
// export default states