import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import TxList from "../TxList";
import { hexToDate, hexToString, hexToNumber } from "@etclabscore/eserialize";
import { useTranslation } from "react-i18next";

import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

function BlockView(props: any) {
  const { block } = props;
  const { t } = useTranslation();

  if (!block) {
    return (<div>Loading...</div>);
  }

  const {
    timestamp, hash, parentHash, miner, nonce, difficulty,
    extraData, stateRoot, transactionsRoot, receiptsRoot, transactions,
  } = block;

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>{t("Number")}</TableCell>
            <TableCell>{hexToNumber(block.number)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Timestamp")}</TableCell>
            <TableCell>{t("Timestamp Date", { date: hexToDate(timestamp)})}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Hash")}</TableCell>
            <TableCell>{hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("ParentHash")}</TableCell>
            <TableCell>
              <Link
                component={({ className, children }: { children: any, className: string }) => (
                  <RouterLink className={className} to={`/block/${parentHash}`} >
                    {children}
                  </RouterLink>
                )}>
                {parentHash}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Miner")}</TableCell>
            <TableCell>
              <Link
                component={({ className, children }: { children: any, className: string }) => (
                  <RouterLink className={className} to={`/address/${miner}`} >
                    {children}
                  </RouterLink>
                )}>
                {miner}
              </Link>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Nonce")}</TableCell>
            <TableCell>{hexToNumber(nonce)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Difficulty")}</TableCell>
            <TableCell>{hexToNumber(difficulty)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Extra Data")}</TableCell>
            <TableCell>{hexToString(extraData)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("State Root")}</TableCell>
            <TableCell>{stateRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Transaction Root")}</TableCell>
            <TableCell>{transactionsRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t("Receipts Root")}</TableCell>
            <TableCell>{receiptsRoot}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <TxList transactions={transactions} />
    </div>
  );
}

export default BlockView;
