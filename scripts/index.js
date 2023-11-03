const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const form = document.querySelector('form')

const times = ['12:00am', '12:30am', '1:00am', '1:30am', '2:00am', '2:30am', '3:00am', '3:30am', '4:00am', '4:30am', '5:00am', '5:30am', '6:00am','6:30am', '7:00am', '7:30am', '8:00am', '8:30am', '9:00am', '9:30am', '10:00am', '10:30am', '11:00am', '11:30am', '12:00pm', '12:30pm', '1:00pm', '1:30pm', '2:00pm', '2:30pm', '3:00pm', '3:30pm', '4:00pm', '4:30pm', '5:00pm', '5:30pm', '6:00pm', '6:30pm', '7:00pm', '7:30pm', '8:00pm', '8:30pm', '9:00pm', '9:30pm', '10:00pm', '10:30pm', '11:00pm', '11:30pm']

form.addEventListener('submit', e => {
    e.preventDefault()

    if (!JSON.parse(localStorage.getItem('availability'))) {
        localStorage.setItem('availability', JSON.stringify([]))
    }

    const availability = JSON.parse(localStorage.getItem('availability'))

    let person = {}

    person.firstName = firstName.value
    person.lastName = lastName.value
    person.availability = {
        monday: {
            string: [],
            duration: 0
        },
        tuesday: {
            string: [],
            duration: 0
        },
        wednesday: {
            string: [],
            duration: 0
        },
        thursday: {
            string: [],
            duration: 0
        },
        friday: {
            string: [],
            duration: 0
        },
        saturday: {
            string: [],
            duration: 0
        },
        sunday: {
            string: [],
            duration: 0
        }
    }

    let allSelects = Array.from(document.querySelectorAll('select'))

    allSelects.forEach(select => {
        let day = select.classList[0]

        person.availability[day].string.push(select.value)
    })

    for (let key in person.availability) {
        person.availability[key].string = `${person.availability[key].string[0] + person.availability[key].string[1] + ' to ' + person.availability[key].string[2] + person.availability[key].string[3] }`
        let newArr = person.availability[key].string.split(' ')
        let from = times.indexOf(newArr[0])
        let to = times.indexOf(newArr[2])
        person.availability[key].duration = (to - from) * 0.5
    }

    availability.push(person)

    localStorage.setItem('availability', JSON.stringify(availability))
})

const getData = () => {
    const availability = JSON.parse(localStorage.getItem('availability'))

    const coverage = {}

    availability.forEach(employee => {
        for (let day in employee.availability) {
            if (coverage[day]) {
                coverage[day].totalHours += employee.availability[day].duration
            } else {
                coverage[day] = {
                    totalHours: employee.availability[day].duration
                }
            }
        }
    })

    console.log(coverage)
}

getData()