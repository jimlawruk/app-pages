export class MapUtils {

    getLayerDefinition(mapServerUrl: string, dataSourceName: string, fieldName: string, items: string[]) {
        var inClauseItems = items.map(function(x) {
          return "'" + x + "'";
        });
        var inClauseString = inClauseItems.join(',');
        let definitionExpression = `${fieldName} IN (${inClauseString})`;

        return {
          url: mapServerUrl,
          definitionExpression: definitionExpression,
          dynamicDataSource: {
            type: "data-layer",
            dataSource: {
              type: "table",
              workspaceId: "MapcoreWorkspace",
              dataSourceName: dataSourceName,
              oidFields: "objectid",
            },
          },
        };
      }
}