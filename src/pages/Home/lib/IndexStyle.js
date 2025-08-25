import styled from 'styled-components';


// Home page propertieshome componenet css :-

export const PropertiesHome = styled.div`
  display: flex;
  margin: 30px 0;
  flex-direction: column;
  align-items: center;

  .properties_title_home {  
    width: 40%;
    margin: 30px 0 0 0;
    text-align: center;

    @media (max-width: 868px) {
      width: 90%;
    }

     .links{
        color: #ee626b;
        font-size: 18px;
      }

      .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #ee626b !important; 
      }

      .ant-tabs-ink-bar {
        background: #ee626b !important;
      }

    h6 {
      color: #ee626b;
      font-size: 15px; 
      text-transform: uppercase;
      font-weight: 700;
    }

    h2 {
      font-size: 40px;
      font-weight: 700;
      text-transform: capitalize;
      margin-top: 20px;
      line-height: 56px;
      margin-bottom: 20px;
    }

    .p-links{
      display: flex;

      li{
        margin: 10px;
        border: 1px solid black;
        padding: 10px 15px;
        border-radius: 10px;
        cursor: pointer;
      }

     
    }
  }
`;
