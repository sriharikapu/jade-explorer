import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@material-ui/core";
import * as React from "react";
import Link from "@material-ui/core/Link";
import { hexToDate } from "@etclabscore/eserialize";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const rightPaddingFix = {
  paddingRight: "24px",
};

function BlockList({ blocks }: any) {
  const { t } = useTranslation();
  if (!blocks) {
    return null;
  }
  const sortedBlocks = blocks.sort((a: { number: number }, b: { number: number }) => {
    return b.number - a.number;
  });
  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography>{t("Block Number")}</Typography></TableCell>
            <TableCell><Typography>{t("Hash")}</Typography></TableCell>
            <TableCell><Typography>{t("Timestamp")}</Typography></TableCell>
            <TableCell><Typography>{t("Transactions")}</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBlocks.map((b: any) => {
            return (
              <TableRow key={b.number}>
                <TableCell component="th" scope="row"><Typography>{parseInt(b.number, 16)}</Typography></TableCell>
                <TableCell style={rightPaddingFix}>
                  <Link
                    component={({ className, children }: { children: any, className: string }) => (
                      <RouterLink className={className} to={`/block/${b.hash}`} >
                        {children}
                      </RouterLink>
                    )}>
                    {b.hash}
                  </Link>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <Typography>{t("Timestamp Date", { date: hexToDate(b.timestamp)})}</Typography>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <Typography>{b.transactions.length}</Typography>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>

  );
}

export default BlockList;
