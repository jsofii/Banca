import { State, Action, StateContext, Selector } from '@ngxs/store';

// Define the model for a product
export interface ProductFormModel {
  name: string;
  description: string;
  price: number;
  releaseDate: string;
  logo: string;
}

// Define the ProductsState model
export interface ProductsStateModel {
  productForm: ProductFormModel; // Tracks the form data
}

// Actions
export class UpdateProductFormValue {
  static readonly type = '[Products] Update Form Value';
  constructor(public payload: { field: keyof ProductFormModel; value: any }) {}
}

export class ResetProductForm {
  static readonly type = '[Products] Reset Form';
}

// State
@State<ProductsStateModel>({
  name: 'products',
  defaults: {
    productForm: {
      name: '',
      description: '',
      price: 0,
      releaseDate: '',
      logo: '',
    },
  },
})
export class ProductsState {
  @Selector()
  static productForm(state: ProductsStateModel) {
    return state.productForm;
  }

  @Action(UpdateProductFormValue)
  updateFormValue(
    ctx: StateContext<ProductsStateModel>,
    action: UpdateProductFormValue
  ) {
    const state = ctx.getState();
    ctx.patchState({
      productForm: {
        ...state.productForm,
        [action.payload.field]: action.payload.value,
      },
    });
  }

  @Action(ResetProductForm)
  resetForm(ctx: StateContext<ProductsStateModel>) {
    ctx.patchState({
      productForm: {
        name: '',
        description: '',
        price: 0,
        releaseDate: '',
        logo: '',
      },
    });
  }
}
