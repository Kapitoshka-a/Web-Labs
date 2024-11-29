import React from "react";
import { Wrapper, IconsWrapper, VerticalLine, LogoWrapper, StyledText } from "./footer_styles";
import { TwitterOutlined, InstagramOutlined, LinkedinOutlined, YoutubeOutlined, AliwangwangOutlined } from "@ant-design/icons";

const Footer = () => {
    return (
        <Wrapper>
            <LogoWrapper>
                <AliwangwangOutlined/>
                <h1>Aws homes</h1>
            </LogoWrapper>
            <p>
                You can explore homes for your data <br/>
            </p>
            <VerticalLine/>
            <IconsWrapper>
                <YoutubeOutlined style={{color: '#FF0000'}}/>
                <TwitterOutlined style={{color: '#03A9F4'}}/>
                <LinkedinOutlined style={{color: '#007AB9'}}/>
                <InstagramOutlined style={{color: '#3A9F4'}}/>
            </IconsWrapper>
            <VerticalLine/>
            <StyledText>© All for your data</StyledText>
        </Wrapper>
    );
};

export default Footer;
  