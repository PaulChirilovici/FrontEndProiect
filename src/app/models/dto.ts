export class DepartmentResponse{
  id!:string;
  description!:string;
}
export class ManagerResponse{
  id!:string;
  name!:string;
  email!:string;
  managerId!:string;
  departmentId!:string;
  role!:string;
}
