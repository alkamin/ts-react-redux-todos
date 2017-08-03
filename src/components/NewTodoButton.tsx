import * as React from 'react';

import { Button } from '@blueprintjs/core';

export interface props {
    onClick?: () => void;
}

function NewTodoButton({onClick}:props) {
    return (
        <Button iconName="add"
                text="Create a New Todo"
                className="pt-intent-primary"
                onClick={onClick}
        />
    )
}

export default NewTodoButton;
