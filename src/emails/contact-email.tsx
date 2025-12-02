import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Text,
  Section,
  Preview,
} from "@react-email/components";

type ContactEmailProps = {
  name: string;
  email: string;
  message: string;
};

export default function ContactEmail({ name, email, message }: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New message from your portfolio site</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading style={heading}>New Message</Heading>
            <Text style={paragraph}>You've received a new message from your portfolio contact form.</Text>
            <Text style={paragraph}>
              <strong>From:</strong> {name}
            </Text>
            <Text style={paragraph}>
              <strong>Email:</strong> {email}
            </Text>
            <Text style={paragraph}>
              <strong>Message:</strong>
            </Text>
            <Text style={paragraph}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
  color: "#333",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555",
};
