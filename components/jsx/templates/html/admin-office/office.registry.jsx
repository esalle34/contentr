import { forms } from "./forms/form.registry";
import { templates } from "./templates/templates.registry";
import { content } from "../content/content.registry";

export const office = Object.assign({}, forms, content, templates);


