import { Table, Tabs, Card, Col, Row, Tag, Skeleton } from "antd";
import type { TabsProps } from 'antd';
import { Container } from "./components/Container";
import { Link } from "./components/Link";
import { Paragraph } from "./components/Paragraph";
import { Section } from "./components/Section";
import { H3 } from "./components/headings";
import { Fragment, useEffect, useState } from "react";
import type { ColumnsType, TableProps } from 'antd/es/table';

const CartsPage = () => {
    const [carts, setCarts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchChart()
    }, []);

    const fetchChart = () => {
        fetch("https://dummyjson.com/carts")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data.carts);
                setCarts(data.carts)
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

    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'title',
            key: 'productName',
        },
        {
            title: 'Discount',
            dataIndex: 'discountPercentage',
            key: 'discountPercentage',
            align: 'center',
            render: (text) => <Tag color={"green"}>{`${text} %`}</Tag>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            align: 'center',
        },
    ];
    const data: DataType[] = carts
    const onChange: TableProps<DataType>['onChange'] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    // Set for data tabs
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Tab 1`,
            children: `Content of Tab Pane 1`,
        },
        {
            key: '2',
            label: `Tab 2`,
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: `Tab 3`,
            children: `Content of Tab Pane 3`,
        },
    ];

    return (
        <Fragment>
            <div className={" mt-16 p-6 bg-white border border-gray-200 rounded-sm shadow dark:bg-gray-800 dark:border-gray-700"}>
                <Skeleton loading={loading}>
                    <main>
                        <div className="px-4">
                            <H3 className="text-purple-700" >Carts</H3>
                            <Tabs>
                                {carts?.map((e, i) => {
                                    return (
                                        <Tabs.TabPane forceRender={true} tab={`Cart ${i + 1}`} key={i}>
                                            <Card className="mb-5 mt-5 bg-gray-200">
                                                <Row>
                                                    <Col className="flex" span={12}>
                                                        <div className=" font-bold mr-2">User: </div>
                                                        <div>Customer {i + 1}</div>
                                                    </Col>
                                                    <Col className="flex" span={12}>
                                                        <div className=" font-bold mr-2"># of Items: { }</div>
                                                        <div>{e.totalProducts}</div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="flex" span={12}>
                                                        <div className=" font-bold mr-2">Added On: </div>
                                                        <div>23 Jul 2023 </div>
                                                    </Col>
                                                    <Col className="flex" span={12}>
                                                        <div className=" font-bold mr-2">Total Amount: </div>
                                                        <div>{e.total} </div>
                                                    </Col>
                                                </Row>
                                            </Card>
                                            <Table
                                                // rowClassName={(record, index) => record.rowSpan != 0 && index != 0 ? "rowClassName1" : ""}
                                                columns={columns}
                                                dataSource={e.products}
                                                pagination={{
                                                    pageSize: 10
                                                }}
                                            />
                                        </Tabs.TabPane>
                                    )
                                })}
                            </Tabs>
                        </div>
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
        </Fragment >
    );
};

export default CartsPage;
