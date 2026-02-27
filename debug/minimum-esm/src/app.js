import mapray from "@mapray/mapray-js";
import maprayui from "@mapray/ui";

class App extends maprayui.StandardUIViewer {
    constructor(container, Option = {}) {
        var accessToken = process.env.MAPRAY_ACCESS_TOKEN;
        super(container, accessToken, {
            debug_stats: new mapray.DebugStats(),
            dem_provider: new mapray.FlatDemProvider(),
        });

        const init_camera = {
            longitude: 139.73685,
            latitude: 35.680,
            height: 5000
        };
        const lookat_position = {
            longitude: 139.69685,
            latitude: 35.689777,
            height: 0
        };
        this.setCameraPosition(init_camera);
        this.setLookAtPosition(lookat_position);

        // Add a text entity for Tokyo Tower
        this._addTextEntity();
    }

    _addTextEntity() {
        const text_entity = new mapray.TextEntity( this.viewer.scene );
        const text_position = new mapray.GeoPoint( 139.7454, 35.6586, 350 );
        text_entity.addText( "Tokyo Tower", text_position, {} );
        text_entity.setColor( [1, 0.2, 0.2] );
        text_entity.setFontSize( 30 );
        this.viewer.scene.addEntity( text_entity );

        const text_entity2 = new mapray.TextEntity( this.viewer.scene );
        const text_position2 = new mapray.GeoPoint( 139.6917, 35.6895, 250 );
        text_entity2.addText( "Shinjuku", text_position2, {} );
        text_entity2.setColor( [0.2, 0.5, 1.0] );
        text_entity2.setFontSize( 26 );
        this.viewer.scene.addEntity( text_entity2 );

        const text_entity3 = new mapray.TextEntity( this.viewer.scene );
        const text_position3 = new mapray.GeoPoint( 139.7671, 35.6812, 200 );
        text_entity3.addText( "Ginza", text_position3, {} );
        text_entity3.setColor( [0.2, 1.0, 0.4] );
        text_entity3.setFontSize( 26 );
        this.viewer.scene.addEntity( text_entity3 );
    }
}
export default App;
