import React from "react";
import { forms } from "../admin-office/forms/form.registry";
import { content } from "../content/content.registry";
import { templates } from "./templates/templates.registry";

export const main = Object.assign({}, forms, content, templates);


