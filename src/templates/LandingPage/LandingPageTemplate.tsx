import { Table, Input, Modal, Row, Col, message, Skeleton } from "antd";
import { isEqual, uniqWith } from 'lodash'
import { Container } from "./components/Container";
import { Link } from "./components/Link";
import { Paragraph } from "./components/Paragraph";
import { Section } from "./components/Section";
import { Subtitle } from "./components/Subtitle";
import { H1, H2, H3 } from "./components/headings";
import { Fragment, useEffect, useState } from "react";
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';



const LandingPageTemplate = () => {
  const [products, setProduct] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true)
  const { Search } = Input;

  useEffect(() => {
    fetchProduct()
  }, []);
  const fetchProduct = () => {
    // setLoading(true)
    fetch("https://dummyjson.com/products/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setProduct(data.products)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
  }

  // Set for data table
  interface DataType {
    key: string;
    title: string;
    brand: string;
    price: number;
    stock: number;
    category: number;
  }

  const titles = products.map((item) => ({
    text: item.title,
    value: item.title,
  }));
  const title = uniqWith(titles, isEqual)
  const brands = products.map((item) => ({
    text: item.brand,
    value: item.brand,
  }));
  const brand = uniqWith(brands, isEqual)
  const categorys = products.map((item) => ({
    text: item.category,
    value: item.category,
  }));
  const category = uniqWith(categorys, isEqual)
  const columns: ColumnsType<DataType> = [
    {
      title: 'Product Name',
      dataIndex: 'title',
      key: 'productName',
      filters: title,
      onFilter: (value: string, record) => record.title.indexOf(value) === 0,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      filters: brand,
      onFilter: (value: string, record) => record.brand.indexOf(value) === 0,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      filters: category,
      onFilter: (value: string, record) => record.category.indexOf(value) === 0,
    },
  ];

  const data: DataType[] = products
  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  // Search Function
  const onSearch = (value: string) => {
    console.log('value', value);
    fetch(`https://dummyjson.com/products/search?q=${value}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data);
        setProduct(data.products)
      })
  }
  // Add Function
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeProduct = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductName(e.target.value);
  };
  const changeBrand = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBrandName(e.target.value);
  };
  const changePrice = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrice(e.target.value);
  };
  const changeCategory = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCategoryName(e.target.value);
  };
  const changeStock = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStock(e.target.value);
  };

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Success data has been added',
    });
  };
  const addProduct = () => {
    console.log("yuhuuuuu");

    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: productName,
        brand: brandName,
        price: price,
        stock: stock,
        category: categoryName
      })
    })
      .then(response => {
        return response.json()
      })
      .then(res => {
        success()
        handleCancel();
        setProductName("");
        setBrandName("");
        setPrice("");
        setCategoryName("");
        setStock("");
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // Set for Chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <Fragment>
      {contextHolder}
      <div className={" mt-16 p-6 bg-white border border-gray-200 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700"}>
        <Skeleton loading={loading}>
          <main>
            <Section>
              <Container>
                <H1>
                  <span className="text-purple-700">Product List</span>{" "}
                </H1>
                <Subtitle className="text-purple-400">You can manage the items you need below.</Subtitle>
              </Container>
            </Section>

            <div className=" flex justify-end px-4 mb-5">
              <Search
                className="w-2/5"
                placeholder="search product"
                onSearch={onSearch}
              />
            </div>

            <div className="px-4">
              <div className="flex justify-between mb-2">
                <H3 className="text-purple-700">Product</H3>
                <button onClick={showModal} type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Add Product</button>
              </div>
              <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
              />
            </div>

            {/* <Bar options={options} data={dataChart} /> */}

          </main>
          <footer>
            <Section>
              <Container center>
                <Paragraph>
                  Created by{" "}
                  <Link href="https://www.linkedin.com/in/fakhrialfatah/">
                    Fakhri Al Fatah
                  </Link>
                </Paragraph>
              </Container>
            </Section>
          </footer>
        </Skeleton>
      </div>

      <Modal
        title="Add Product"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <button onClick={handleCancel} type="button" className="py-1 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Cancel</button>,
          <button
            disabled={productName === "" ? true : false}
            onClick={addProduct}
            type="button"
            className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-md text-sm px-3 py-1 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Submit</button>,
        ]}
      >
        <Row className='mb-2'>
          <Col span={6}><p>Product Name</p></Col>
          <Col className="flex items-center" span={16}><span className="mr-2">:</span><Input value={productName} onChange={changeProduct} /></Col>
        </Row>
        <Row className='mb-2'>
          <Col span={6}><p>Brand</p></Col>
          <Col className="flex items-center" span={16}><span className="mr-2">:</span><Input value={brandName} onChange={changeBrand} /></Col>
        </Row>
        <Row className='mb-2'>
          <Col span={6}><p>Price</p></Col>
          <Col className="flex items-center" span={16}><span className="mr-2">:</span><Input value={price} onChange={changePrice} /></Col>
        </Row>
        <Row className='mb-2'>
          <Col span={6}><p>Stock</p></Col>
          <Col className="flex items-center" span={16}><span className="mr-2">:</span><Input value={stock} onChange={changeStock} /></Col>
        </Row>
        <Row className='mb-2'>
          <Col span={6}><p>Category</p></Col>
          <Col className="flex items-center" span={16}><span className="mr-2">:</span><Input value={categoryName} onChange={changeCategory} /></Col>
        </Row>
      </Modal>
    </Fragment>
  );
};

export default LandingPageTemplate;
