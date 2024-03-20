import { AppBar, Box, Toolbar, styled } from '@mui/material';


//components
import ChatDialog from '../components/chat/ChatDialog';


const Component = styled(Box)`
    height: 100vh;
    background: #DCDCDC;
`;

const Header = styled(AppBar)`
    background-color: #00A884;
    height: 5.2rem;
    box-shadow: none;
`;
    

const Messenger = () => {

    
    return (
        <Component>

                    <Header>
                        <Toolbar></Toolbar>
                    </Header>
                    <ChatDialog />

        </Component>
    )
}

export default Messenger;