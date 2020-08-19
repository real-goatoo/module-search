import React from 'react'
import {Icon, Input} from "semantic-ui-react";

const SearchInput = ({doSearch}) => {
    return (
        <Input
            icon={<Icon name='search' inverted circular link />}
            placeholder='Search...'
            type="text"
            onChange={(e) => doSearch(e.target.value)}
        />
    );
}

export default SearchInput;