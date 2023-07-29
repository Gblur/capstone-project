import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html{
    scroll: smooth;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll; 
  }

  html::-webkit-scrollbar {
      display: none; /* for Chrome, Safari, and Opera */
  }
  :root{
    // Nodes
    --color-node-parent-bg: #ffd17d;
    --color-node-child-bg: #7dafff;
    --color-node-unbound-bg: #ffa8ba;
    --color-node-border: #f2f7f5;
    --color-node-border--selected:  #00332c;
    --color-node-text: #475d5b;
    --color-node-icon-success: #38fc41;
    --color-node-icon-pending: #ffef61;
    --color-node-icon-danger: #ff3838;
    // Dashboard
    --color-dashboard-border: gray;
    --color-hover-item: #ccffe5;
    --color-background-item: #5adb99;
    // Details Page
    --color-bg-box-info: rgba(255,255,255,0.9);


  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;

  }
  #__next {
    min-height: calc(100vh)

  }
  body {

    margin: 0 auto;
    max-width: 768px;
    font-family: system-ui;
    padding: 0 20px;
    background: url("/images/map_bg_color.jpeg") no-repeat center;
    background-size: cover;
  }`;
