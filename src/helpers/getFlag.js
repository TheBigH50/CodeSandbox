export default async function getFlag(setFlag, setLoaded) {
try {
    const flagData = await fetch("https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/77726f");
const flag = await flagData.text();
setFlag([...flag.split("")]);
setLoaded(true);
} catch(e) {
    console.error(e);
}
}