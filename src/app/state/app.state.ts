// import { ProductState } from '../products/state/product.reducer';
import * as auth from '../auth/store/auth.reducer';

export interface AppState {
  // products: ProductState;
  authState: auth.AuthState;
}
