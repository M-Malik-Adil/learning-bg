import { UserRole } from '@shared/constants';
import { Request } from 'express';

export interface AppRequest extends Request {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    organization?: string;
    companyId?: string;
    account: Account;
  };
}

interface Account {
  _id: string;
  user: string;
  isActive: boolean;
  company: Company;
  product: Product;
  team: string;
  role: Role;
}

interface Company {
  _id: string;
  accountName: string;
  products: string[];
}

interface Product {
  _id: string;
  name: string;
  logo: Logo;
}

interface Logo {
  id: string;
  url: string;
  size: number;
  mimetype: string;
}

interface Role {
  _id: string;
  name: string;
  permissions: string[];
}
