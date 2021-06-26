import React, { useState} from 'react';
import {Box, Container, Grid, Slider} from "@material-ui/core";
import ClusterTable from "../components/ClusterTable";
import Typography from "@material-ui/core/Typography";
import {useQuery} from "react-query";
import LoadSkeleton from "../components/LoadingSkeleton";

function ClusterDebugger() {
    const [threshold, setThreshold] = useState(0.85)
    const { isLoading, error, data, isFetching } = useQuery(["cluster-items", threshold], () =>
        fetch(
            `http://127.0.0.1:8000/cluster-items?threshold=${threshold}`
        ).then((res) => res.json()),
        {refetchInterval: 10000}
    );

    const handleChange = (event, newValue) => {
        setThreshold(newValue);
    }

    return (
        <Container maxWidth="md">
            <h1 className={'page-title'}>Cluster Debugger</h1>
            <Typography variant="subtitle1">
                Clusters of similar datapoints but with different labels
            </Typography>
            <Grid container justify="flex-end">
                <Box width={'150px'} float={"right"}>
                    <Typography variant={'body2'} align={'right'}>
                                Threshold
                            </Typography>
                            <Slider
                                defaultValue={0.85}
                                step={0.05}
                                min={0.7}
                                max={1}
                                valueLabelDisplay="auto"
                                onChange={handleChange}
                            />
                </Box>
            </Grid>

            <Box pb={4} pt={2}>
                {isLoading && <LoadSkeleton />}
                {error && error.toString()}
                {data && !isLoading && data.map((items, index) => {
                    return <ClusterTable items={items} key={index}/>
                })
                }
            </Box>
        </Container>
    );
}

export default ClusterDebugger;
