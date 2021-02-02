import { forms } from "./forms/form.registry";
import { dropdown } from "./dropdown/dropdown.registry"
import { popin } from "./popin/popin.registry";
import { progress } from "./progress/progress.registry"
import { invokables } from "./invokables/invokables.registry";
import { panels } from "./panels/panels.registry";

export const officeRegistry = Object.assign({}, dropdown, forms, popin, progress, invokables, panels); 