import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { H3 } from './components/headings';

const ChartBar = () => {

    const [products, setProducts] = useState([])

    interface Product {
        id: number;
        title: string;
        description: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        brand: string;
        category: string;
        thumbnail: string;
        images: string[];
    }

    interface ChartOptions {
        chart: {
            id: string;
        };
        xaxis: {
            categories: string[];
        };
    }

    interface ChartSeries {
        name: string;
        data: number[];
    }

    useEffect(() => {
        fetchProduct()
    }, []);
    const fetchProduct = () => {
        fetch("https://dummyjson.com/products/")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setProducts(data.products)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const brands: string[] = products.map((product: Product) => product.title);
    const stock: number[] = products.map((product: Product) => product.stock);

    console.log("brand nih", brands)
    console.log("stock nih", stock)

    const options: ChartOptions = {
        chart: {
            id: 'basic-column'
        },
        xaxis: {
            categories: brands
        }
    }

    const series: ChartSeries[] = [{
        name: 'Stock',
        data: stock
    }];

    return (
        <div className='mt-4'>
            <H3 className="text-purple-700">Chart of total product</H3>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    )
}

export default ChartBar