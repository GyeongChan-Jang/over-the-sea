import React, { useEffect, useState } from 'react'
import { Card, Tabs } from 'flowbite-react'
import useTime from '~/hooks/useTime'
import useConvertLatLng from '~/hooks/useConvertLatLng'
import { getWeather } from '~/utils/getWeather'
import Loading from '~/components/Loading'

interface WeatherResponse {
  baseData: string
  baseTime: string
  category: string
  fcstDate: string
  fcstTime: string
  fcstValue: string
  nx: number
  ny: number
}

const MapOverlay = ({ setIsOpen, location, seaWater, sand }: any) => {
  const { today, nowForcastTime } = useTime()
  const [isLoading, setIsLoading] = useState(true)
  const [sky, setSky] = useState<any>([])
  const [pop, setPop] = useState<any>([])
  const [tmp, setTmp] = useState<any>([])
  const rs: any = useConvertLatLng({
    geoX: parseFloat(location.lon),
    geoY: parseFloat(location.lat)
  })

  useEffect(() => {
    const { x, y } = rs.rs
    getWeather({ today, nowForcastTime, nx: x, ny: y, numOfRows: 80 })
      .then((res) => {
        setIsLoading(false)
        res?.map((item: WeatherResponse) => {
          if (item.category === 'SKY') {
            setSky((prev: any) => [...prev, item])
          }
          if (item.category === 'POP') {
            setPop((prev: any) => [...prev, item])
          }
          if (item.category === 'TMP') {
            setTmp((prev: any) => [...prev, item])
          }
        })
      })
      .catch((err) => console.log(err))
  }, [])

  console.log(sand)

  return (
    <div className="overlaybox">
      <div className="max-w-xs -m-2">
        <Card
          imgAlt="Meaningful alt text for an image that is not purely decorative"
          imgSrc="https://www.gtdc.or.kr/dzSmart/upfiles/Tours/2018August/34/0cbd16f8edf5e3e1ec23f1da43b791de_1534734408.jpg"
        >
          <div className="flex flex-col items-center gap-2">
            <p className="text-center text-blue-700 text-lg align-middle">
              <span className="mr-2">
                <img src="../../../public/assets/images/beach-ball.png" width={24} height={24} />
              </span>
              <span className="align-top">{location.sta_nm} 해수욕장</span>
              <span className="ml-2">
                <img src="../../../public/assets/images/beach-ball.png" width={24} height={24} />
              </span>
            </p>
            <p className="text-neutral-600">
              {location.sido_nm} {location.gugun_nm}{' '}
            </p>
            <div className="w-full pt-1 relative">
              <Tabs.Group aria-label="Full width tabs" style="fullWidth">
                <Tabs.Item title="날 씨 ☀️">
                  {!isLoading ? (
                    <div className="flex justify-between">
                      <div>
                        {sky[0]?.fcstValue && sky[0].fcstValue == 1 ? (
                          <div className="">
                            <img src="../../../public/assets/weather/day.svg" />
                            <p className="leading-6 text-center text-neutral-700">맑음!</p>
                          </div>
                        ) : sky[0]?.fcstValue == 2 ? (
                          <div>
                            <img src="../../../public/assets/weather/cloudy-day-3.svg" />
                            <p className="leading-6 text-center text-neutral-700">구름 많음!</p>
                          </div>
                        ) : sky[0]?.fcstValue >= 3 ? (
                          <div>
                            <img src="../../../public/assets/weather/cloudy.svg" />
                            <p className="leading-6 text-center text-neutral-700">흐림!</p>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div>
                        {pop[0]?.fcstValue && pop[0].fcstValue >= 0 && pop[0].fcstValue < 30 ? (
                          <div>
                            <img src="../../../public/assets/weather/cloudy-day-3.svg" />
                            <p className="leading-6 text-center text-neutral-700">
                              {pop[0].fcstValue}%
                            </p>
                          </div>
                        ) : pop[0]?.fcstValue >= 30 && pop[0].fcstValue < 60 ? (
                          <div>
                            <img src="../../../public/assets/weather/rainy-5.svg" />
                            <p className="leading-6 text-center text-neutral-700">
                              {pop[0].fcstValue}%
                            </p>
                          </div>
                        ) : pop[0]?.fcstValue >= 60 && pop[0].fcstValue < 100 ? (
                          <div>
                            <img src="../../../public/assets/weather/rainy-6.svg" />
                            <p className="leading-6 text-center text-neutral-700">
                              {pop[0]?.fcstValue}%
                            </p>
                          </div>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className="mt-3 mr-2">
                        {tmp[0] && (
                          <div>
                            <img
                              src="../../../public/assets/weather/high-temperature.png"
                              width={44}
                              height={44}
                            />
                            <p className="mt-3 text-neutral-700">{tmp[0]?.fcstValue}°C</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 mx-auto">
                      <Loading />
                    </div>
                  )}
                </Tabs.Item>
                <Tabs.Item title="수 질 🌊">
                  <div className="flex justify-around">
                    <div>
                      {seaWater.res_yn === '적합' ? (
                        <div>
                          <img
                            src="../../../public/assets/images/appropriate.png"
                            width={40}
                            height={40}
                            className="mt-1"
                          />{' '}
                          <p className="mt-6">{seaWater.res_yn}</p>
                        </div>
                      ) : seaWater.res_yn === '부적합' ? (
                        <div>
                          <img
                            src="../../../public/assets/images/inappropriate.png"
                            width={40}
                            height={40}
                          />{' '}
                          <p className="text-red-600">{seaWater.res_yn}</p>
                        </div>
                      ) : (
                        <p>수질 정보 없음</p>
                      )}
                    </div>
                    <div>
                      {seaWater.res1 ? (
                        <div>
                          <img
                            src="../../../public/assets/images/bacteria.png"
                            width={40}
                            height={40}
                            className="ml-3"
                          />
                          <p className="mt-2 text-center mb-1 text-slate-500">
                            {seaWater.res1.includes('&lt;1')
                              ? seaWater.res1.replace('&lt;1', '1미만')
                              : seaWater.res1}
                          </p>
                          <p>(대장균)</p>
                        </div>
                      ) : (
                        <p>정보 없음</p>
                      )}
                    </div>
                    <div>
                      {seaWater.res1 ? (
                        <div>
                          <img
                            src="../../../public/assets/images/biology.png"
                            width={40}
                            height={40}
                            className="ml-3"
                          />
                          <p className="mt-2 text-center mb-1 text-slate-500">
                            {seaWater.res2.includes('&lt;1')
                              ? seaWater.res2.replace('&lt;1', '1미만')
                              : seaWater.res2}
                          </p>
                          <p>(장구균)</p>
                        </div>
                      ) : (
                        <p>정보 없음</p>
                      )}
                    </div>
                  </div>
                </Tabs.Item>
                <Tabs.Item title="백 사 장 🏖️">
                  <div className="flex justify-around">
                    <div>
                      {sand.res_yn === '적합' ? (
                        <div>
                          <img
                            width={40}
                            height={40}
                            src="../../../public/assets/images/appropriate.png"
                          />
                          <p className="mt-7">{sand.res_yn}</p>
                        </div>
                      ) : (
                        <div>
                          <img
                            width={40}
                            height={40}
                            src="../../../public/assets/images/inappropriate.png"
                          />
                          <p className="mt-7 text-red-600">{sand.res_yn}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      {sand.res3 ? (
                        <div>
                          <img
                            width={40}
                            height={40}
                            src="../../../public/assets/images/cadmium.png"
                            className="ml-2.5"
                          />
                          <p className="mt-2 text-center mb-1 text-slate-500">{sand.res1}</p>
                          <p>(카드뮴)</p>
                        </div>
                      ) : (
                        <p>정보 없음</p>
                      )}
                    </div>
                    <div>
                      {sand.res3 ? (
                        <div>
                          <img
                            width={40}
                            height={40}
                            src="../../../public/assets/images/mercury.png"
                            className="ml-1"
                          />
                          <p className=" mt-2 text-center mb-1 text-slate-500">{sand.res3}</p>
                          <p>(수은)</p>
                        </div>
                      ) : (
                        <p>정보 없음</p>
                      )}
                    </div>
                  </div>
                </Tabs.Item>
              </Tabs.Group>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)}>X</button>
        </Card>
      </div>
    </div>
  )
}

export default MapOverlay
