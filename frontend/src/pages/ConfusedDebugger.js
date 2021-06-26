import React from 'react';
import {Box, Container} from "@material-ui/core";
import ConfusedTable from '../components/ConfusedTable';
import Typography from "@material-ui/core/Typography";
import {useQuery} from "react-query";
import LoadSkeleton from "../components/LoadingSkeleton";

function ConfusedDebugger() {
    const { isLoading, error, data } = useQuery("confused-items", () =>
    fetch(
      "http://127.0.0.1:8000/confused-items"
        ).then((res) => res.json()),
        {refetchInterval: 10000}
    );

    return (
        <Container maxWidth="md" >
            <h1 className={'page-title'}>Confused Debugger</h1>
            <Typography variant="subtitle1" >
                An overview of datapoints where the model most confidently disagrees with the annotations <br/> along with the top 5 most similar neighbouring datapoints
            </Typography>
            <Box pb={4} pt={4}>
                {isLoading && <LoadSkeleton />}
                {error && error.toString()}
                {data && !isLoading && data.map((items, index) => {
                    return <ConfusedTable items={items} key={index}/>
                })
                }
            </Box>
        </Container>
    );
}

export default ConfusedDebugger;
