package io.alanda.object.store.rest;

import io.alanda.object.store.dto.AlandaObjectTypeDto;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.persistence.SecondaryTable;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Tag(name = "AlandaObjectTypeRestService")
@Path("app/object/type")
@Produces(MediaType.APPLICATION_JSON)
public interface AlandaObjectTypeRestService {

    @GET
    @Path("/get/{typeGuid}")
    @Produces(MediaType.APPLICATION_JSON)
    AlandaObjectTypeDto get(@PathParam("typeGuid") Long typeGuid);

    @GET
    @Path("/get/all")
    @Produces(MediaType.APPLICATION_JSON)
    List<AlandaObjectTypeDto> getAll();

    @POST
    @Path("/create")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    AlandaObjectTypeDto create(AlandaObjectTypeDto alandaObjectTypeDto);

}
