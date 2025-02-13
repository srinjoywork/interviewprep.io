import React, { useContext } from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.png'
import { ModalContext } from '../../context/ModalContext'
import backgroundImage from '../../assets/codebg.jpg';

const StyledLeftComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 35%;
    height: 100vh;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        position: relative;
        width: 100%;
    }
`;

const ContentContainer = styled.div`
    text-align: center;
`

const Logo = styled.img`
    width: 165px;
    margin-bottom: 1rem;
`

const MainHeading = styled.h1`
    font-size: 2.5rem;
    font-weight: 400;
    color: #fff;
    margin-bottom: 0.75rem;

    span{
        font-weight: 700;
    }
`
const SubHeading = styled.div`
    font-size: 1.6rem;
    color: #ffff;
    font-weight:800;
    opacity: 01;
    margin-bottom: 1.5rem;
`

const AddNewButton = styled.button`
    padding: 0.25rem 1.5rem;
    font-size: 1rem;
    border: none;
    border-radius: 30px;
    box-shadow: 0px 0px 4px 2px #8b8b8b;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: all 0.2s ease-in-out;
    span{
        font-size: 2rem;
        font-weight: 700;
    }

    &:hover{
        cursor: pointer;
        scale: 1.05;
        box-shadow: 0px 0px 6px 2px #8b8b8b;
    }
`
const LeftComponent = () => {
    const { openModal } = useContext(ModalContext);
    return (
        <StyledLeftComponent>
            <ContentContainer>
                <Logo src={logo} alt="" />
                <MainHeading> <span>Codefy</span></MainHeading>
                <SubHeading>Code. Test. Run.</SubHeading>
                <AddNewButton onClick={() => openModal({
                    show: true,
                    modalType: 3,
                    identifiers: {
                        folderId: "",
                        cardId: "",
                    }
                })} ><span>+</span>Create Code Lab</AddNewButton>
            </ContentContainer>
        </StyledLeftComponent>
    )
}

export default LeftComponent