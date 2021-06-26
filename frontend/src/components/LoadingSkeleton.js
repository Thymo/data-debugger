import {Box} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

export default function LoadSkeleton() {
    return <Box>
        <Skeleton />
        <Skeleton />
        <Skeleton />
    </Box>
}
