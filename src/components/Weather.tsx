import React, { useEffect, useState } from 'react'
import { getWeather } from '~/utils/getWeather'
import useTime from '~/hooks/useTime'
import useConvertLatLng from '~/hooks/useConvertLatLng'
import Loading from './Loading'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '~/components/UI/TabPanel'
import WeatherGraph from './Graph/WeatherGraph'
import HumidityGraph from './Graph/HumidityGraph'
import 'swiper/css'
import 'swiper/css/navigation'
import WindGraph from './Graph/WindGraph'

const Weather = ({ locationWeather }: any) => {
  const { rs } = useConvertLatLng({
    geoX: locationWeather && locationWeather?.lon,
    geoY: locationWeather && locationWeather?.lat
  })

  console.log(locationWeather)

  const [todayLow, setTodayLow] = useState<any>()
  const [todayHigh, setTodayHigh] = useState<any>()
  const [todayWeather, setTodayWeather] = useState<any>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [value, setValue] = useState<number>(0)
  const [forecastTmp, setForecastTmp] = useState<any>()
  const [forecastHum, setForecastHum] = useState<any>()
  const [forecastWind, setForecastWind] = useState<any>()

  const { today, nowForcastTime } = useTime()
  console.log(today)

  const tabHandler = (event: any, newValue: any) => {
    setValue(newValue)
  }

  useEffect(() => {
    const payload = { today, nowForcastTime, numOfRows: 1000, nx: rs.x, ny: rs.y }
    getWeather(payload)
      .then((res) => {
        console.log(res)
        setIsLoading(false)

        setTodayWeather(res.slice(0, 12))
        setForecastTmp(res.slice(0, 301).filter((item: any) => item.category === 'TMP'))
        setForecastHum(res.slice(0, 301).filter((item: any) => item.category === 'REH'))
        setForecastWind(res.slice(0, 301).filter((item: any) => item.category === 'WSD'))
        res.find((item: any) => {
          if (item.category === 'TMN') {
            setTodayLow(item.fcstValue)
          }
          if (item.category === 'TMX') {
            setTodayHigh(item.fcstValue)
          }
        })
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <div>
        <div className="flex flex-col gap-2 lg:text-2xl p-4 sm:text-xl rounded-2xl shadow-2xl bg-white overflow-x-auto h-[560px] relative ">
          {!isLoading ? (
            <>
              <div className="my-4 text-center text-3xl text-slate-800">
                {locationWeather?.sta_nm} /{' '}
                {todayWeather[5].fcstValue == 1 ? (
                  <img className="relative top-6 bottom-4 " src="/assets/weather/day.svg" />
                ) : todayWeather[5].fcstValue == 3 ? (
                  <img className="relative top-6 bottom-4 " src="/assets/weather/cloudy-day-3.svg" />
                ) : todayWeather[5].fcstValue == 4 ? (
                  <img className="relative top-6 bottom-4 " src="/assets/weather/cloudy.svg" />
                ) : todayWeather[5].fcstValue == 3 && todayWeather[6] == 1 ? (
                  <img className="relative top-6 bottom-4 " src="/assets/weather/rainy-4.svg" />
                ) : todayWeather[5].fcstValue == 4 && todayWeather[6] == 1 ? (
                  <img className="relative top-6 bottom-4 " src="/assets/weather/rainy-5.svg" />
                ) : (
                  ''
                )}
                <span>{todayWeather[0].fcstValue}℃</span>
              </div>
              <div>
                <div className="flex mt-2">
                  <div className="flex-1 text-center text-xl">
                    최저기온
                    <span className="text-blue-800"> {todayLow}℃</span>
                  </div>
                  <div className="flex-1 text-center text-xl">
                    최고기온
                    <span className="text-red-800"> {todayHigh}℃</span>
                  </div>
                </div>
                <div className="flex mt-6">
                  <div className="flex flex-1 text-center text-xl justify-center">
                    <img src="/assets/weather/humidity.png" width={40} height={40} />
                    <p className="text-sm ml-2">
                      <span className="text-sky-700 text-[1rem]">{todayWeather[10].fcstValue}%</span> <br />
                      습도
                    </p>
                  </div>
                  <div className="flex flex-1 text-center text-xl justify-center">
                    <img src="/assets/weather/wind.png" width={40} height={40} />
                    <p className="text-sm ml-2">
                      <span className="text-blue-600 text-[1rem]">{todayWeather[4].fcstValue}m/s</span> <br />
                      바람
                    </p>
                  </div>
                </div>
                <Box className="w-full mt-10">
                  <Box className="border-b-1 divide-blue-500">
                    <Tabs value={value} onChange={tabHandler} variant="fullWidth">
                      <Tab label="날씨" className="font-jalnanche " />
                      <Tab label="습도" className="font-jalnanche overflow-auto" />
                      <Tab label="바람" className="font-jalnanche overflow-auto" />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <WeatherGraph forecastTmp={forecastTmp} />
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <HumidityGraph forecastHum={forecastHum} />
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <WindGraph forecastWind={forecastWind} />
                  </TabPanel>
                </Box>
              </div>
            </>
          ) : (
            <div className="absolute inset-y-1/2 left-1/2 -translate-x-10 -translate-y-10">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Weather
