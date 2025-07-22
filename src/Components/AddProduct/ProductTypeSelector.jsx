import React from 'react';
import { Form, Radio } from 'antd';

const ProductTypeSelector = ({ productType, setProductType }) => {
    return (
        <Form.Item
            label="Product Type"
            name="product_type"
            rules={[
                { required: true, message: "Please select product type" },
            ]}
        >
            <Radio.Group
                onChange={(e) => setProductType(e.target.value)}
                value={productType}
                optionType="button"
                buttonStyle="solid"
            >
                <Radio.Button value={true}>Wholesaler</Radio.Button>
                <Radio.Button value={false}>Only User</Radio.Button>
            </Radio.Group>
        </Form.Item>
    );
};

export default ProductTypeSelector;
