import React, { useState, useEffect } from 'react'
import {
  Input,
  IconButton,
  Text,
  Box,
  HStack,
  Heading,
  Center,
  Spacer,
  Flex,
  Switch,
  InputGroup,
  InputRightElement,
  VStack
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'

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
  if (temp === true) {
    metric = 'metric'
  } else if (temp === false) {
    metric = 'imperial'
    console.log(metric)
  }
  // DATE
  var timeZone = weatherData.dt
  console.log(timeZone)

  const [date, setDate] = useState(null)
  const [month, setMonth] = useState(null)
  const [day, setDay] = useState(null)
  const [time, setTime] = useState(null)
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
    let localTime = today.toLocaleTimeString('default', {
      hour: '2-digit',
      minute: '2-digit'
    })
    setDay(day)
    setDate(date)
    setMonth(month)
    setTime(localTime)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const apiKey = '9b2477569365fd72fe7af9c03f6ff8b4'
  const getWeather = event => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${metric}`
    )
      .then(res => res.json())
      .then(data => {
        weatherDataSet(data)
        console.log(data)
      })
  }
  return (
    <Center w='100%'>
      <Box maxW='500px' w='100%' m={5}>
        {/* HEADING  */}
        <Flex
          direction='row'
          justifyContent='center'
          alignItems='center'
          mb={5}
        >
          <Box>
            <Heading size='lg'>Weather App</Heading>
          </Box>
          <Spacer />
          <Box>
            <HStack>
              <Text>Fahrenheit</Text>
              <Switch
                justifyContent='center'
                value={temp}
                onValueChange={toggleSwitch}
                defaultIsChecked
              />
              <Text>Celsius</Text>
            </HStack>
          </Box>
        </Flex>

        <HStack>
          <InputGroup>
            <Input
              type='text'
              value={city}
              placeholder='City Name'
              onChange={e => citySet(e.target.value)}
            />
            <InputRightElement
              onClick={() => citySet('')}
              children={<CloseIcon color='gray.400' />}
            />
          </InputGroup>

          <IconButton
            icon={<SearchIcon />}
            title='search button'
            onClick={() => getWeather()}
            variant='solid'
            ml={3}
            colorScheme='blue'
          />
        </HStack>
        <Flex direction='row'>
          <Box p={4}>
            <Heading size='md'>{day}</Heading>
          </Box>
          <Spacer />
          <Box p={4} alignContent='center' justifyContent='center'>
            <Heading size='sm'>
              {month} {date}
            </Heading>
          </Box>
        </Flex>
        {typeof weatherData.main === 'undefined' ? (
          <>
            <Text textAlign='center' pt={5}>
              Connected
            </Text>
          </>
        ) : (
          <Center pt={7}>
            <VStack>
              <Box mb={5}>
                {/* @city name      @country name  */}

                <Text>{time}</Text>
                <Text
                  textAlign='center'
                  fontWeight='semibold'
                  fontSize='lg'
                  mt={3}
                >
                  {weatherData.name}, {weatherData.sys.country}
                </Text>
                {/* @temp in Celsius  */}
                <Text textAlign='center' fontSize='5xl' fontWeight='bold'>
                  {weatherData.main.temp}°C
                </Text>
              </Box>

              <Box mt={5}>
                <Text textAlign='center'>{weatherData.weather[0].main}</Text>
                <Text textAlign='center'>
                  {weatherData.weather[0].description}
                </Text>
              </Box>

              {weatherData.main.temp > 25 ? <>HOT</> : <>cold</>}
            </VStack>
          </Center>
        )}
      </Box>
    </Center>
  )
}

export default App
