// This file is shared across the demos.

import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Receipt from 'material-ui-icons/Receipt';

export const opcionesMenuPrincipal = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <Receipt />
            </ListItemIcon>
            <ListItemText primary="Facturas" />
        </ListItem>
    </div>
);
