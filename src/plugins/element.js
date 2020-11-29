import Vue from 'vue'
import {
     Button, 
     Form, 
     FormItem, 
     Input, 
     Message, 
     Container, 
     Header, 
     Aside, 
     Main, 
     Menu,
     MenuItem, 
     Submenu,
     MenuItemGroup, 
     Breadcrumb, 
     BreadcrumbItem, 
     Card, 
     Table, 
     TableColumn, 
     Pagination,
     Dialog,
     MessageBox
} from 'element-ui'
export default({
  
})
Vue.use(Button, 
  Input, 
  Form, 
  FormItem, 
  Container, 
  Header, 
  Aside, 
  Main, 
  Menu, 
  MenuItem, 
  Submenu, 
  MenuItemGroup, 
  Breadcrumb, 
  BreadcrumbItem, 
  Card, 
  Table, 
  TableColumn, 
  Pagination, 
  Dialog);
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
