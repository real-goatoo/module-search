import React from 'react'
import {Icon, Input, Form} from "semantic-ui-react";

const SearchInput = ({doSearch}) => {
    return (
        <Form.Field>
            <Input
                size="huge"
                icon={<Icon name='search' inverted circular link />}
                placeholder='Search your module here'
                type="text"
                onChange={(e) => doSearch(e.target.value)}
            />
        </Form.Field>
    );
}

export default SearchInput;