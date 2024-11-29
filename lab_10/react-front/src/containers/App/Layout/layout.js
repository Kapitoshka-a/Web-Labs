import React from "react";
import { StyledHeader, IconsWrapper, Header } from "./layout_styles";

import {
  TwitterOutlined,
  ShoppingCartOutlined,
  InstagramOutlined,
  FacebookOutlined,
  AliwangwangOutlined,

} from "@ant-design/icons";
import { Link } from "react-router-dom";
import {CenteredButton} from "../../../components/button/catalog_button";

const Layout = () => (
  <StyledHeader title="House Haven">
    <div style={{alignItems: "center"}}>

      <IconsWrapper>
        <AliwangwangOutlined />
      </IconsWrapper>

     <Link to={"/"} style={{textDecoration: 'none'}}>
      <p>House Haven</p>
      </Link>
      
      
    </div>

      <Link to="/catalog" style={{ textDecoration: 'none' }}>
          <CenteredButton size="large">Catalog</CenteredButton>
      </Link>
      <div>
          <Link to={'/bincard'}>
              <IconsWrapper>
                  <ShoppingCartOutlined/>
              </IconsWrapper>
          </Link>
      </div>
  </StyledHeader>
);

export default Layout;