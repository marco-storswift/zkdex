import {Typography, Button} from "antd";

interface PoolsTitleProps {
    onClick: () => void
}

export default function PoolsTitle(props: PoolsTitleProps) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center"
        }}>
            <Typography style={{
                fontSize: "36px", fontWeight: 600
            }}>Pools</Typography>

            <Button style={{
                backgroundColor: "rgb(251, 17, 142)",
                color: "rgb(245, 246, 252)",
            }} shape="round" onClick={props.onClick}>
                {"+ New Position"}
            </Button>

        </div>)
}