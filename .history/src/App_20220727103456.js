import React, { useState, useEffect } from 'react'
import {
  Input,
  IconButton,
  Checkbox,
  Text,
  Box,
  VStack,
  HStack,
  Heading,
  Icon,
  Center,
  useToast,
  Spacer,
  Flex,
  Menu,
  Switch,
  
} from '@chakra-ui/react'
const App = () => {
  // DATA
  const [city, citySet] = useState('')
  const [weatherData, weatherDataSet] = useState([{}])
  const [temp, tempSet] = useState(true)
  const toggleSwitch = () => {
    getWeather()

    tempSet(prevState => !prevState)
  }

  let metric
  if (temp == true) {
    metric = 'metric'
  } else if (temp == false) {
    metric = 'imperial'
  }
  // DATE
  const [date, setDate] = useState(null)
  const [month, setMonth] = useState(null)
  const [day, setDay] = useState(null)
  var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  useEffect(() => {
    let today = new Date()
    let day = days[today.getDay()]
    let date = today.getDate()
    let month = months[today.getMonth() + 1]
    setDay(day)
    setDate(date)
    setMonth(month)
  })

  const apiKey = '9b2477569365fd72fe7af9c03f6ff8b4'
  const getWeather = event => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${metric}`
    )
      .then(res => res.json())
      .then(data => {
        weatherDataSet(data)
        //empty out the form
        citySet('')
        console.log(weatherData)
      })
  }
  return <div>App</div>
}

export default App
