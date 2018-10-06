import { ModelsInterface } from "./ModelsInterface";

export interface baseModelInterface {
    prototype?;
    associate?(models: ModelsInterface) : void;
}