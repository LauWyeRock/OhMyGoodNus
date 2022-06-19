import { useRouter } from "next/router";
import styled from "styled-components";
import { useSession } from "next-auth/react"
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from '../components/Message'

function ChatScreen({chat, messages}) {
    const router = useRouter();
    const { data: session } = useSession();
    //const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'))

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                  key={message.id}
                  user={message.data().user}
                  message={{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                  }}
                />
            ))
        }
    }


    return (
        <Container>
          <Header>
            <Avatar />

            <HeaderInformation>
                <h3>RecipientEmail</h3>
                <p>Last Seen ...</p>
            </HeaderInformation>
            <HeaderIcons>
                <IconButton>
                    <AttachFileIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </HeaderIcons>
          </Header>

          <MessageContainer>
            <EndOfMessage />
          </MessageContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div``;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex:1;

    > h3 {
        margin-bottom: 3px;
    }

    > p {
        font-size: 14px;
        color: gray;
    }
`;

const EndOfMessage = styled.div``;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div``;