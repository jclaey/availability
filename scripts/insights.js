const results = document.querySelector('#results')
const byDay = document.querySelector('#by-day')
const employees = document.querySelector('#employees')

const getAvailabilityByDay = () => {
    if (!JSON.parse(localStorage.getItem('availability'))) {
        localStorage.setItem('availability', JSON.stringify([]))
    }

    const availability = JSON.parse(localStorage.getItem('availability'))
    const availabilityMap = {}

    availability.forEach(employee => {
        // add in availability per day, by employee (who's available for which days and for how long)

        for (let day in employee.availability) {
            if (!availabilityMap[day]) {
                availabilityMap[day] = { strings: [{ id: employee.id ? employee.id : null, string: employee.availability[day].string}], durations: [{id: employee.id ? employee.id : null, duration: employee.availability[day].duration}] }
            } else {
                availabilityMap[day].strings.push({ id: employee.id ? employee.id : null, string: employee.availability[day].string })
                availabilityMap[day].durations.push({ id: employee.id ? employee.id : null, duration: employee.availability[day].duration }) 
            }
        }
    })

    return availabilityMap
}

const renderAvailabilityByEmployee = () => {
    if (!localStorage.getItem('availability') || JSON.parse(localStorage.getItem('availability')).length === 0) {
        results.innerHTML = `
            <p>No availability data yet</p>
        `
    } else {
        const data = JSON.parse(localStorage.getItem('availability'))
        let output = ''

        data.map(employee => {
            const {firstName, lastName, availability} = employee

            employees.innerHTML += `
                <div>
                    <h2>${lastName}, ${firstName}</h2>
                    <h3>Availability:</h3>
            `
            
            for (let day in availability) {
                employees.innerHTML += `
                    <div>
                        <p>Day: <strong>${day[0].toUpperCase() + day.slice(1)}</strong></p>
                `

                if (availability[day].duration === 0) {
                    employees.innerHTML += `
                            <p style="color: red">No availability</p>
                        </div>
                    `
                } else {
                    employees.innerHTML += `
                            <p>Duration (hours): ${availability[day].duration}</p>
                            <p>Times Available: ${availability[day].string}</p>
                        </div>
                    `
                }
            }

            employees.innerHTML += `
                </div>
                <hr>
            `
        })
    }
}

const renderAvailabilityByDay = () => {
    if (!localStorage.getItem('availability')) {
        results.innerHTML = `
            <p>No availability data yet</p>
        `
    } else {
        let output = ''
        const availabilityByDay = getAvailabilityByDay()
        const availability = JSON.parse(localStorage.getItem('availability'))

        console.log(availabilityByDay)

        let totalDurationByDay = []

        for (let day in availabilityByDay) {
            let totalDuration = 0
            let employeeIds = []

            output += `
                <h2>${day[0].toUpperCase() + day.slice(1)}</h2>
            `

            availabilityByDay[day].durations.forEach(duration => {
                totalDuration += duration.duration
                employeeIds.push(duration.id)
            })

            output += `
                <p>Total Employee Hours Available: ${totalDuration}</p>
                <div>Employees Available: 
            `

            employeeIds.forEach(id => {
                let employee = availability.find(employee => employee.id === id)

                output += `
                    ${employee.firstName} ${employee.lastName}${employeeIds.length === 1 ? '' : ','}
                `
            })

            totalDurationByDay.push({ day, totalDuration })
        }

        console.log(totalDurationByDay)

        byDay.innerHTML = output
    }
}

renderAvailabilityByDay()

renderAvailabilityByEmployee()