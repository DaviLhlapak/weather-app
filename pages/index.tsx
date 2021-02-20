import { useRef, useState } from "react";

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import LayoutComponent from "../components/interface/layout";
import InputComponent from "../components/interaction/input";

import { FaSearch, FaSpinner, FaSun, FaMoon, FaCloud, FaCloudRain, FaCloudMoon, FaCloudSun, FaCloudSunRain, FaSnowflake } from 'react-icons/fa'

import axios from "axios";

import CityClimate from "../interfaces/cityClimate";


export default function HomePage() {
    const [city, setCity] = useState<string>("")
    const [searching, setSearching] = useState<boolean>(false)
    const [weather, setWeather] = useState<CityClimate>()

    const formRef = useRef<FormHandles>(null);

    const handleSubmit: SubmitHandler<FormData> = async (data: any) => {
        if (data.city != "") {
            formRef.current?.reset()

            setSearching(true)

            setCity(data.city)

            let weatherResponse = await axios.create().get(`/api/weather/${data.city}`)

            if (weatherResponse.status == 200) {
                setWeather(weatherResponse.data[0])
            }

            setSearching(false)
        }
    };

    function weatherIcon(icon?: number) {
        if (icon != undefined) {
            if (icon >= 1 && icon <= 4) {
                return (
                    <FaSun className="text-4xl" />
                )
            } else if (icon >= 33 && icon <= 36) {
                return (
                    <FaMoon className="text-4xl" />
                )
            }
            else if (icon >= 13 && icon <= 14) {
                return (
                    <FaCloudSunRain className="text-4xl" />
                )
            }
            else if (icon >= 39 && icon <= 40) {
                return (
                    <FaCloudSunRain className="text-4xl" />
                )
            }
            else if (icon == 7) {
                return (
                    <FaCloud className="text-4xl" />
                )
            }
            else if (icon == 18) {
                return (
                    <FaCloudRain className="text-4xl" />
                )
            }
            else if (icon == 38) {
                return (
                    <FaCloudMoon className="text-4xl" />
                )
            }
            else if (icon == 6) {
                return (
                    <FaCloudSun className="text-4xl" />
                )
            }
            else if (icon == 22) {
                return (
                    <FaSnowflake className="text-4xl" />
                )
            }
        }
    }

    return (
        <LayoutComponent title="Weather App" isDay={(weather && !weather.IsDayTime) ? false : true}>
            <Form className={"relative items-center justify-center  " + ((searching) ? "hidden" : "flex")} ref={formRef} onSubmit={handleSubmit}>
                <InputComponent className="w-80 h-10 shadow rounded-md py-2 px-4 pr-16 text-black" name="city" placeholder="Digite o nome da sua Cidade" required />
                <button className="h-full px-3 absolute right-0 " type="submit">
                    <FaSearch className="text-gray-600 text-2xl " />
                </button>
            </Form>

            <FaSpinner className={"animate-spin border-white text-5xl " + ((searching) ? "flex" : "hidden")} />

            <article className={"w-80 h-40 shadow rounded-md bg-white mt-8 text-black " + ((weather != undefined) ? "visible" : "invisible")}>
                <header>
                    <div className="flex items-center mb-3 rounded-t-md bg-purple-800 text-white w-full p-5">
                        {weatherIcon(weather?.WeatherIcon)}
                        <h2 className="text-3xl font-bold capitalize ml-2">{city}</h2>
                    </div>
                    <h1 className="font-bold text-2xl px-6"> ºC {weather?.Temperature.Metric.Value}</h1>
                    <p className="px-6">{weather?.WeatherText}</p>
                </header>
            </article>
        </LayoutComponent>
    )
}